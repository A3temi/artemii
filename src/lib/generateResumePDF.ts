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

  for (let i = 0; i < Math.min(data.projects.length, 7); i++) {
    const project = data.projects[i];
    
    if (rightYPos > pageHeight - 40) {
      pdf.addPage();
      drawLeftColumnBackground();
      rightYPos = 15;
    }

    try {
      const projImg = await loadImage(`/icons/proj${i + 1}.png`);
      const maxIconSize = 16;
      const aspectRatio = projImg.width / projImg.height;
      const imgWidth = aspectRatio > 1 ? maxIconSize : maxIconSize * aspectRatio;
      const imgHeight = aspectRatio > 1 ? maxIconSize / aspectRatio : maxIconSize;
      
      pdf.addImage(projImg, 'PNG', rightColumnStart, rightYPos, imgWidth, imgHeight, undefined, 'FAST');
      
      const textStartX = rightColumnStart + maxIconSize + 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(project.title, textStartX, rightYPos + 5);

      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text(project.duration, textStartX, rightYPos + 11);

      rightYPos += Math.max(imgHeight, 16) + 5;
    } catch (error) {
      console.error(`Error loading proj${i + 1}.png:`, error);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(project.title, rightColumnStart, rightYPos);
      rightYPos += 5;

      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text(project.duration, rightColumnStart, rightYPos);
      rightYPos += 5;
    }

    // Project Description
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    rightYPos = addText(project.description, rightColumnStart, rightYPos, rightColumnWidth, 8);
    rightYPos += 3;

    // Project Skills
    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(42, 39, 42);
    pdf.text('Skills: ', rightColumnStart, rightYPos);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    rightYPos = addText(project.skills.join(' • '), rightColumnStart + 10, rightYPos, rightColumnWidth - 10, 7.5);
    rightYPos += 9;
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

  for (let i = 0; i < Math.min(data.experiences.length, 4); i++) {
    const exp = data.experiences[i];
    
    if (rightYPos > pageHeight - 50) {
      pdf.addPage();
      drawLeftColumnBackground();
      rightYPos = 15;
    }

    try {
      const expImg = await loadImage(`/icons/exp${i + 1}.png`);
      const maxIconSize = 18;
      const aspectRatio = expImg.width / expImg.height;
      const imgWidth = aspectRatio > 1 ? maxIconSize : maxIconSize * aspectRatio;
      const imgHeight = aspectRatio > 1 ? maxIconSize / aspectRatio : maxIconSize;
      
      pdf.addImage(expImg, 'PNG', rightColumnStart, rightYPos, imgWidth, imgHeight, undefined, 'FAST');
      
      const textStartX = rightColumnStart + maxIconSize + 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(exp.fullTitle, textStartX, rightYPos + 6);

      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text(exp.duration, textStartX, rightYPos + 12);

      rightYPos += Math.max(imgHeight, 18) + 6;
    } catch (error) {
      console.error(`Error loading exp${i + 1}.png:`, error);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(exp.fullTitle, rightColumnStart, rightYPos);
      rightYPos += 6;

      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text(exp.duration, rightColumnStart, rightYPos);
      rightYPos += 6;
    }

    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    rightYPos = addText(exp.description, rightColumnStart, rightYPos, rightColumnWidth, 9);
    rightYPos += 4;

    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(42, 39, 42);
    pdf.text('Skills: ', rightColumnStart, rightYPos);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    rightYPos = addText(exp.skills.join(' • '), rightColumnStart + 10, rightYPos, rightColumnWidth - 10, 7.5);
    rightYPos += 10;
  }

  // Save PDF
  pdf.save(`${data.name.replace(/\s+/g, '_')}_Resume.pdf`);
};