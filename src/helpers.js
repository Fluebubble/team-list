import { EMAIL_REGEXP, VALID_PHOTO_TYPES } from './constants';

// scroll to block
export const handleScrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView();
  }
};

// formatting phone for render
export const formatPhone = (phone) => {
  return `${phone.slice(0, 3)} (${phone.slice(3, 6)}) ${phone.slice(6, 9)} ${phone.slice(9, 11)} ${phone.slice(11, 13)}`;
};

// working with file upload
// export const isValidFileType = (fileName, fileType) => {
//   return (
//     fileName &&
//     VALID_PHOTO_TYPES[fileType].indexOf(fileName.split('.').pop()) > -1
//   );
// };

export const isValidEmail = (email) => EMAIL_REGEXP.test(email);
