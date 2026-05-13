import React from 'react';

import styles from './Skeleton.module.scss';

type SkeletonProps = React.ComponentProps<'div'>;

function Skeleton(props: SkeletonProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={`${styles.skeleton} ${className}`}></div>;
}

export default Skeleton;
