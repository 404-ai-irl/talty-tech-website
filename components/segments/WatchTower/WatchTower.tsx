import React from 'react';
import styles from './watchtower.module.css';

interface WatchTowerProps {
  scale?: number; // Add a scale prop to control overall size
}

// Helper component for a single bird
const Bird: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div className={styles.body}></div>
      <div className={styles.wing1}>
        <div className={styles.wing2}>
          <div className={styles.wing3}></div>
        </div>
      </div>
    </div>
  );
};

// Helper component to generate multiple birds
const BirdGroup: React.FC<{ className: string, count: number }> = ({ className, count }) => {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <Bird key={i + 1} className={`${styles.bird} ${styles[`b${i + 1}`]}`} />
      ))}
    </div>
  );
};

// Helper component for a tree
const Tree: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div className={styles.top}></div>
      <div className={styles.mid}></div>
      <div className={styles.bot}></div>
    </div>
  );
};

export const WatchTower: React.FC<WatchTowerProps> = ({ scale = 1 }) => {
  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
  };

  return (
    <div className={styles.container} style={containerStyle}>
      <BirdGroup className={`${styles.birds} ${styles.front}`} count={12} />
      <BirdGroup className={`${styles.birds} ${styles.back}`} count={12} />
      
      {/* Cloud elements */}
      <div className={`${styles.cloud} ${styles.big}`}>
        {/* Note: SCSS defines c1 through c8, so we start from 1 */}
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i + 1} className={`${styles.circle} ${styles[`c${i + 1}`]}`}></div>
        ))}
      </div>
      
      <div className={`${styles.cloud} ${styles.small}`}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i + 1} className={`${styles.circle} ${styles[`c${i + 1}`]}`}></div>
        ))}
      </div>
      
      {/* Mountain with zigzag pattern */}
      <div className={styles.mountain}>
        <div className={styles.backdrop}></div>
        <div className={`${styles.zig} ${styles.zag1}`}></div>
        <div className={`${styles.zig} ${styles.zag2}`}></div>
        <div className={`${styles.zig} ${styles.zag3}`}></div>
        <div className={`${styles.zig} ${styles.zag4}`}></div>
       
      </div>
      
      {/* Tower */}
      <div className={styles.tower}>
        <div className={styles.roof1}></div>
        <div className={styles.roof2}></div>
        <div className={styles.wall}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i + 1} className={styles[`w${i + 1}`]}></div>
          ))}
        </div>
        <div className={styles.legs}>
          <div className={styles.left}></div>
          <div className={styles.right}></div>
          <div className={styles.support1}>
            <div className={styles.criss}></div>
            <div className={styles.cross}></div>
            <div className={styles.flat}></div>
          </div>
          <div className={styles.support2}>
            <div className={styles.criss}></div>
            <div className={styles.cross}></div>
            <div className={styles.flat}></div>
          </div>
        </div>
      </div>
      
      {Array.from({ length: 8 }, (_, i) => (
        <Tree key={`treeBack-${i + 1}`} className={`${styles.tree} ${styles.treeBack} ${styles[`tree${i + 1}`]}`} />
      ))}
      
      {/* treeMid has 5 trees */}
      {Array.from({ length: 5 }, (_, i) => (
        <Tree key={`treeMid-${i + 1}`} className={`${styles.tree} ${styles.treeMid} ${styles[`tree${i + 1}`]}`} />
      ))}
      
      {/* treeFront has 4 trees */}
      {Array.from({ length: 4 }, (_, i) => (
        <Tree key={`treeFront-${i + 1}`} className={`${styles.tree} ${styles.treeFront} ${styles[`tree${i + 1}`]}`} />
      ))}
    </div>
  );
};

export default WatchTower;