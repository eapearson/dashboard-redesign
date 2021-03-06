import React from 'react';
import { Link } from 'react-router-dom';
// as of now eslint cannot detect when imported interfaces are used
import { Location, LocationDescriptor } from 'history'; // eslint-disable-line no-unused-vars

interface LinkFunction {
  (loc: Location): LocationDescriptor;
}

export interface Props {
  className?: string;
  selected: string;
  tabs: [string, Record<string, string | LinkFunction>][];
}

// Active and inactive tab styles using Tachyons classes
const tabClasses = {
  active: 'tab active',
  inactive: 'tab inactive',
};

// Horizontal tab navigation UI.
export const TabHeader: React.FC<Props> = ({ className, selected, tabs }) => {
  let outerClass = 'pt2';
  if (className) {
    outerClass += ` ${className}`;
  }
  return (
    <div className={outerClass}>
      <ul
        className="list pa0 ma0 flex items-center"
        style={{ position: 'relative', top: '1px' }}
      >
        {tabs.map(([tabSlug, tabData]) => {
          const className =
            selected === tabSlug ? tabClasses.active : tabClasses.inactive;
          return (
            <Link key={tabSlug} to={tabData.link}>
              <li
                key={tabSlug}
                className={className}
                style={{ userSelect: 'none' }}
              >
                {tabData.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
