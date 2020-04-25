import React from 'react';
type DropdownMenuReturn = [
  HTMLElement | null,
  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  () => void,
  boolean
];
export const useDropdownMenu = (): DropdownMenuReturn => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return [anchorEl, handleProfileMenuOpen, handleMenuClose, isMenuOpen];
};
