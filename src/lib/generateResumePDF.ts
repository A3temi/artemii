import jsPDF from 'jspdf';

interface ResumeData {
  name: string;
  title: string;
  location: string;
  linkedin: string;
  languages: string;
  email: string;
  profileImage: string;
  about: {
    title: string;
    experienceYears: number;
    paragraphs: Array<{ text: string }>;
  };
  experiences: Array<{
    id: number;
    fullTitle: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  achievements: Array<{
    title: string;
    desc: string;
  }>;
  projects: Array<{
    id: number;
    title: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  education: {
    institution: string;
    degree: string;
    duration: string;
  };
  skills: {
    technical: string[];
    soft: string[];
  };
}

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const generateResumePDF = async (data: ResumeData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const sortedProjects = [...data.projects].sort((left, right) => right.id - left.id);
  const sortedExperiences = [...data.experiences].sort((left, right) => right.id - left.id);
  
  // Define column widths
  const leftColumnWidth = 65;
  const rightColumnStart = leftColumnWidth + 5;
  const rightColumnWidth = pageWidth - rightColumnStart - 10;
  const leftMargin = 10;

  // Helper function to draw left column background
  const drawLeftColumnBackground = () => {
    pdf.setFillColor(42, 39, 42); // #2A272A
    pdf.rect(0, 0, leftColumnWidth, pageHeight, 'F');
  };

  // Draw initial left column background
  drawLeftColumnBackground();

  // Helper function to add text with word wrap
  const addText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize: number = 10,
    isBold: boolean = false,
    align: 'left' | 'center' | 'right' = 'left'
  ) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = pdf.splitTextToSize(text, maxWidth);
    
    if (align === 'center') {
      lines.forEach((line: string, index: number) => {
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, x + (maxWidth - textWidth) / 2, y + (index * fontSize * 0.5));
      });
    } else {
      pdf.text(lines, x, y, { align });
    }
    
    return y + (lines.length * fontSize * 0.5);
  };

  const getLineHeight = (fontSize: number) => fontSize * 0.5;

  const getWrappedLines = (
    text: string,
    maxWidth: number,
    fontSize: number,
    isBold: boolean = false
  ) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    return pdf.splitTextToSize(text, maxWidth) as string[];
  };

  const drawLines = (
    lines: string[],
    x: number,
    y: number,
    fontSize: number,
    isBold: boolean = false,
    color: [number, number, number] = [0, 0, 0]
  ) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(...color);

    const lineHeight = getLineHeight(fontSize);
    lines.forEach((line, index) => {
      pdf.text(line, x, y + (index * lineHeight));
    });

    return y + (Math.max(lines.length, 1) * lineHeight);
  };

  const ensureRightColumnSpace = (requiredHeight: number, currentY: number) => {
    if (currentY + requiredHeight <= pageHeight - 12) {
      return currentY;
    }

    pdf.addPage();
    drawLeftColumnBackground();
    return 15;
  };

  const renderProjectSummary = async (
    project: ResumeData['projects'][number],
    startY: number
  ) => {
    const iconBoxSize = 16;
    const textStartX = rightColumnStart + iconBoxSize + 6;
    const textWidth = rightColumnWidth - iconBoxSize - 6;
    const titleLines = getWrappedLines(project.title, textWidth, 10, true);
    const durationLines = getWrappedLines(project.duration, textWidth, 7);
    const descriptionLines = getWrappedLines(project.description, rightColumnWidth, 8);
    const skillsLines = getWrappedLines(project.skills.join(' • '), rightColumnWidth - 10, 7.5);

    const titleHeight = titleLines.length * getLineHeight(10);
    const durationHeight = durationLines.length * getLineHeight(7);
    const headerHeight = Math.max(iconBoxSize, titleHeight + 1.5 + durationHeight);
    const descriptionHeight = descriptionLines.length * getLineHeight(8);
    const skillsHeight = Math.max(getLineHeight(7.5), skillsLines.length * getLineHeight(7.5));
    const blockHeight = headerHeight + 5 + descriptionHeight + 3 + skillsHeight + 9;

    let currentY = ensureRightColumnSpace(blockHeight, startY);

    try {
      const projImg = await loadImage(`/icons/proj${project.id}.png`);
      const aspectRatio = projImg.width / projImg.height;
      const imgWidth = aspectRatio > 1 ? iconBoxSize : iconBoxSize * aspectRatio;
      const imgHeight = aspectRatio > 1 ? iconBoxSize / aspectRatio : iconBoxSize;

      pdf.addImage(projImg, 'PNG', rightColumnStart, currentY, imgWidth, imgHeight, undefined, 'FAST');
    } catch (error) {
      console.error(`Error loading proj${project.id}.png:`, error);
    }

    let textY = currentY + 4.5;
    textY = drawLines(titleLines, textStartX, textY, 10, true, [0, 0, 0]);
    textY += 1.5;
    drawLines(durationLines, textStartX, textY, 7, false, [100, 100, 100]);

    currentY += headerHeight + 5;
    currentY = drawLines(descriptionLines, rightColumnStart, currentY, 8, false, [0, 0, 0]);
    currentY += 3;

    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(42, 39, 42);
    pdf.text('Skills: ', rightColumnStart, currentY);

    currentY = drawLines(skillsLines, rightColumnStart + 10, currentY, 7.5, false, [0, 0, 0]);
    return currentY + 9;
  };

  const renderExperienceSummary = async (
    experience: ResumeData['experiences'][number],
    startY: number
  ) => {
    const iconBoxSize = 18;
    const textStartX = rightColumnStart + iconBoxSize + 6;
    const textWidth = rightColumnWidth - iconBoxSize - 6;
    const titleLines = getWrappedLines(experience.fullTitle, textWidth, 10, true);
    const durationLines = getWrappedLines(experience.duration, textWidth, 8);
    const descriptionLines = getWrappedLines(experience.description, rightColumnWidth, 9);
    const skillsLines = getWrappedLines(experience.skills.join(' • '), rightColumnWidth - 10, 7.5);

    const titleHeight = titleLines.length * getLineHeight(10);
    const durationHeight = durationLines.length * getLineHeight(8);
    const headerHeight = Math.max(iconBoxSize, titleHeight + 1.5 + durationHeight);
    const descriptionHeight = descriptionLines.length * getLineHeight(9);
    const skillsHeight = Math.max(getLineHeight(7.5), skillsLines.length * getLineHeight(7.5));
    const blockHeight = headerHeight + 6 + descriptionHeight + 4 + skillsHeight + 10;

    let currentY = ensureRightColumnSpace(blockHeight, startY);

    try {
      const expImg = await loadImage(`/icons/exp${experience.id}.png`);
      const aspectRatio = expImg.width / expImg.height;
      const imgWidth = aspectRatio > 1 ? iconBoxSize : iconBoxSize * aspectRatio;
      const imgHeight = aspectRatio > 1 ? iconBoxSize / aspectRatio : iconBoxSize;

      pdf.addImage(expImg, 'PNG', rightColumnStart, currentY, imgWidth, imgHeight, undefined, 'FAST');
    } catch (error) {
      console.error(`Error loading exp${experience.id}.png:`, error);
    }

    let textY = currentY + 5;
    textY = drawLines(titleLines, textStartX, textY, 10, true, [0, 0, 0]);
    textY += 1.5;
    drawLines(durationLines, textStartX, textY, 8, false, [100, 100, 100]);

    currentY += headerHeight + 6;
    currentY = drawLines(descriptionLines, rightColumnStart, currentY, 9, false, [0, 0, 0]);
    currentY += 4;

    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(42, 39, 42);
    pdf.text('Skills: ', rightColumnStart, currentY);

    currentY = drawLines(skillsLines, rightColumnStart + 10, currentY, 7.5, false, [0, 0, 0]);
    return currentY + 10;
  };

  // Store left column content to render later
  const renderLeftColumn = async () => {
    let leftYPos = 15;

    // LEFT COLUMN - Profile Image
    try {
      const profileImg = await loadImage(data.profileImage);
      const imgSize = 45;
      const imgX = leftMargin + (leftColumnWidth - leftMargin * 2 - imgSize) / 2;
      
      pdf.addImage(profileImg, 'PNG', imgX, leftYPos, imgSize, imgSize, undefined, 'FAST');
      leftYPos += imgSize + 12;
    } catch (error) {
      console.error('Error loading profile image:', error);
      leftYPos += 10;
    }

    // LEFT COLUMN - Contact Info Section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(248, 236, 228); // #F8ECE4
    pdf.text('CONTACT', leftMargin, leftYPos);
    leftYPos += 5;
    
    pdf.setDrawColor(248, 236, 228);
    pdf.setLineWidth(0.5);
    pdf.line(leftMargin, leftYPos, leftColumnWidth - 10, leftYPos);
    leftYPos += 6;

    // Location
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 234, 207); // #FFEACF
    pdf.text('Location', leftMargin, leftYPos);
    leftYPos += 3.5;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(255, 247, 214); // #FFF7D6
    leftYPos = addText(data.location, leftMargin, leftYPos, leftColumnWidth - leftMargin * 2, 8);
    leftYPos += 4;

    // Email
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 234, 207);
    pdf.text('Email', leftMargin, leftYPos);
    leftYPos += 3.5;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(255, 247, 214);
    leftYPos = addText(data.email, leftMargin, leftYPos, leftColumnWidth - leftMargin * 2, 7);
    leftYPos += 4;

    // LinkedIn
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 234, 207);
    pdf.text('LinkedIn', leftMargin, leftYPos);
    leftYPos += 3.5;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(255, 247, 214);
    leftYPos = addText(data.linkedin, leftMargin, leftYPos, leftColumnWidth - leftMargin * 2, 7);
    leftYPos += 7;

    // LEFT COLUMN - Languages Section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(248, 236, 228);
    pdf.text('LANGUAGES', leftMargin, leftYPos);
    leftYPos += 4;
    
    pdf.setDrawColor(248, 236, 228);
    pdf.line(leftMargin, leftYPos, leftColumnWidth - 10, leftYPos);
    leftYPos += 5;

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(255, 247, 214);
    leftYPos = addText(data.languages, leftMargin, leftYPos, leftColumnWidth - leftMargin * 2, 8);
    leftYPos += 6;

    // LEFT COLUMN - Experience Years
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(248, 236, 228);
    pdf.text('EXPERIENCE', leftMargin, leftYPos);
    leftYPos += 4;

    pdf.setDrawColor(248, 236, 228);
    pdf.line(leftMargin, leftYPos, leftColumnWidth - 10, leftYPos);
    leftYPos += 8;

    // Experience years on same line
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 234, 207);
    pdf.text(`${data.about.experienceYears}+`, leftMargin + 10, leftYPos);

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(255, 247, 214);
    pdf.text('Years', leftMargin + 35, leftYPos);
    leftYPos += 10;

    // LEFT COLUMN - Education Section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(248, 236, 228);
    pdf.text('EDUCATION', leftMargin, leftYPos);
    leftYPos += 4;
    
    pdf.setDrawColor(248, 236, 228);
    pdf.line(leftMargin, leftYPos, leftColumnWidth - 10, leftYPos);
    leftYPos += 5;

    try {
      const ucsiImg = await loadImage('/icons/ucsi.png');
      const iconSize = 14;
      const aspectRatio = ucsiImg.width / ucsiImg.height;
      const imgWidth = iconSize * aspectRatio;
      const imgHeight = iconSize;
      
      // Image on the left
      pdf.addImage(ucsiImg, 'PNG', leftMargin, leftYPos, imgWidth, imgHeight, undefined, 'FAST');
      
      // Text to the right of image
      const textStartX = leftMargin + imgWidth + 3;
      const textWidth = leftColumnWidth - leftMargin * 2 - imgWidth - 3;
      
      pdf.setFontSize(8.5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 234, 207);
      const institutionLines = pdf.splitTextToSize(data.education.institution, textWidth);
      pdf.text(institutionLines, textStartX, leftYPos + 4);
      const institutionHeight = institutionLines.length * 4;
      
      pdf.setFontSize(7.5);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(255, 247, 214);
      const degreeLines = pdf.splitTextToSize(data.education.degree, textWidth);
      pdf.text(degreeLines, textStartX, leftYPos + 4 + institutionHeight);
      const degreeHeight = degreeLines.length * 3.5;
      
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(255, 234, 207);
      pdf.text(data.education.duration, textStartX, leftYPos + 4 + institutionHeight + degreeHeight);
      
      leftYPos += Math.max(imgHeight, 4 + institutionHeight + degreeHeight + 3) + 6;
    } catch (error) {
      console.error('Error loading UCSI logo:', error);
      
      pdf.setFontSize(8.5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 234, 207);
      leftYPos = addText(data.education.institution, leftMargin, leftYPos, leftColumnWidth - leftMargin * 2, 8.5, true);
      leftYPos += 3;
      
      pdf.setFontSize(7.5);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(255, 247, 214);
      leftYPos = addText(data.education.degree, leftMargin, leftYPos, leftColumnWidth - leftMargin * 2, 7.5);
      leftYPos += 3;
      
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(255, 234, 207);
      leftYPos = addText(data.education.duration, leftMargin, leftYPos, leftColumnWidth - leftMargin * 2, 7);
      leftYPos += 6;
    }

    // LEFT COLUMN - Technical Skills Section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(248, 236, 228);
    pdf.text('SKILLS', leftMargin, leftYPos);
    leftYPos += 4;
    
    pdf.setDrawColor(248, 236, 228);
    pdf.line(leftMargin, leftYPos, leftColumnWidth - 10, leftYPos);
    leftYPos += 5;

    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(255, 247, 214);
    
    data.skills.technical.forEach((skill) => {
      // Check if we need a new page
      if (leftYPos > pageHeight - 15) {
        pdf.addPage();
        drawLeftColumnBackground();
        leftYPos = 15;
      }
      
      pdf.setTextColor(255, 234, 207);
      pdf.text('•', leftMargin, leftYPos);
      pdf.setTextColor(255, 247, 214);
      leftYPos = addText(skill, leftMargin + 4, leftYPos, leftColumnWidth - leftMargin * 2 - 4, 7.5);
      leftYPos += 2;
    });
  };

  // Render left column first
  await renderLeftColumn();

  // Now render right column on the SAME page
  let rightYPos = 15;

  // RIGHT COLUMN - Name and Title
  pdf.setTextColor(42, 39, 42); // #2A272A
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.name.toUpperCase(), rightColumnStart, rightYPos);
  rightYPos += 10;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100, 100, 100);
  pdf.text(data.title, rightColumnStart, rightYPos);
  rightYPos += 12;

  // RIGHT COLUMN - About Section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(42, 39, 42);
  pdf.text('ABOUT ME', rightColumnStart, rightYPos);
  rightYPos += 5;
  
  pdf.setDrawColor(42, 39, 42);
  pdf.setLineWidth(0.8);
  pdf.line(rightColumnStart, rightYPos, pageWidth - 10, rightYPos);
  rightYPos += 6;

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  data.about.paragraphs.forEach((para) => {
    rightYPos = addText(para.text, rightColumnStart, rightYPos, rightColumnWidth, 9);
    rightYPos += 4;
  });
  rightYPos += 5;

  // RIGHT COLUMN - Achievements Section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(42, 39, 42);
  pdf.text('KEY ACHIEVEMENTS', rightColumnStart, rightYPos);
  rightYPos += 5;

  pdf.setDrawColor(42, 39, 42);
  pdf.setLineWidth(0.8);
  pdf.line(rightColumnStart, rightYPos, pageWidth - 10, rightYPos);
  rightYPos += 8;

  data.achievements.forEach((achievement) => {
    if (rightYPos > pageHeight - 30) {
      pdf.addPage();
      drawLeftColumnBackground();
      rightYPos = 15;
    }

    // Achievement Title
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    rightYPos = addText(achievement.title, rightColumnStart, rightYPos, rightColumnWidth, 10, true);
    rightYPos += 2;

    // Achievement Description
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(50, 50, 50);
    rightYPos = addText(achievement.desc, rightColumnStart, rightYPos, rightColumnWidth, 8);
    rightYPos += 8;
  });

  rightYPos += 3;

  // RIGHT COLUMN - Projects Section
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(42, 39, 42);
  pdf.text('KEY PROJECTS', rightColumnStart, rightYPos);
  rightYPos += 5;

  pdf.setDrawColor(42, 39, 42);
  pdf.setLineWidth(0.8);
  pdf.line(rightColumnStart, rightYPos, pageWidth - 10, rightYPos);
  rightYPos += 8;

  for (let i = 0; i < Math.min(sortedProjects.length, 7); i++) {
    rightYPos = await renderProjectSummary(sortedProjects[i], rightYPos);
  }

  rightYPos += 3;

  // RIGHT COLUMN - Experience Section
  if (rightYPos > pageHeight - 50) {
    pdf.addPage();
    drawLeftColumnBackground();
    rightYPos = 15;
  }

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(42, 39, 42);
  pdf.text('PROFESSIONAL EXPERIENCE', rightColumnStart, rightYPos);
  rightYPos += 5;
  
  pdf.setDrawColor(42, 39, 42);
  pdf.setLineWidth(0.8);
  pdf.line(rightColumnStart, rightYPos, pageWidth - 10, rightYPos);
  rightYPos += 8;

  for (const experience of sortedExperiences) {
    rightYPos = await renderExperienceSummary(experience, rightYPos);
  }

  // Save PDF
  pdf.save(`${data.name.replace(/\s+/g, '_')}_Resume.pdf`);
};
