import type {BoxProps} from '@mui/material/Box';

import {useId, forwardRef} from 'react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import {useTheme} from '@mui/material/styles';

import {RouterLink} from 'src/routes/components';

import {logoClasses} from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({width = 40, height = 40, disableLink = false, className, href = '/', sx, ...other}, ref) => {
    const theme = useTheme();

    const gradientId = useId();

    const PRIMARY_LIGHT = theme.vars.palette.primary.light;

    const PRIMARY_MAIN = theme.vars.palette.primary.main;

    const PRIMARY_DARK = theme.vars.palette.primary.dark;

    /*
     * OR using local (public folder)
     * const logo = ( <Box alt="logo" component="img" src={`${CONFIG.site.basePath}/logo/logo-single.svg`} width={width} height={height} /> );
     */

    const logo = (
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
           width="40" height="40" viewBox="0 0 40 40"
           preserveAspectRatio="xMidYMid meet">
        <metadata />
        <g transform="translate(0.000000,40.000000) scale(0.003125,-0.003125)"
           fill={PRIMARY_LIGHT} stroke="none" opacity="0.8">
          <path d="M6110 12794 c-341 -22 -566 -47 -810 -90 -981 -172 -1916 -573 -2710
    -1162 -500 -371 -962 -833 -1332 -1332 -651 -879 -1075 -1937 -1207 -3015 -39
    -313 -45 -428 -45 -795 0 -437 23 -720 90 -1100 330 -1878 1474 -3507 3127
    -4454 804 -461 1650 -725 2627 -822 246 -25 854 -25 1100 0 977 97 1823 361
    2627 822 1161 665 2087 1679 2643 2894 267 585 451 1230 529 1865 37 296 46
    446 46 795 0 428 -25 725 -91 1100 -304 1732 -1299 3256 -2759 4227 -894 595
    -1895 946 -2985 1048 -153 15 -724 27 -850 19z"/>
        </g>
        <text x="20" y="20" fontSize="5" fontFamily="Arial" fill="white" textAnchor="middle"
              alignmentBaseline="central">LOGO
        </text>
      </svg>

    );

    return (
      <NoSsr
        fallback={
          <Box
            width={width}
            height={height}
            className={logoClasses.root.concat(className ? ` ${className}` : '')}
            sx={{flexShrink: 0, display: 'inline-flex', verticalAlign: 'middle', ...sx}}
          />
        }
      >
        <Box
          ref={ref}
          component={RouterLink}
          href={href}
          width={width}
          height={height}
          className={logoClasses.root.concat(className ? ` ${className}` : '')}
          aria-label="logo"
          sx={{
            flexShrink: 0,
            display: 'inline-flex',
            verticalAlign: 'middle',
            ...(disableLink && {pointerEvents: 'none'}),
            ...sx,
          }}
          {...other}
        >
          {logo}
        </Box>
      </NoSsr>
    );
  }
);
