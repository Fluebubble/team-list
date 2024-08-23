export const handleScrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView();
  }
};

export const formatPhone = (phone) => {
  return `${phone.slice(0, 3)} (${phone.slice(3, 6)}) ${phone.slice(6, 9)} ${phone.slice(9, 11)} ${phone.slice(11, 13)}`;
};
