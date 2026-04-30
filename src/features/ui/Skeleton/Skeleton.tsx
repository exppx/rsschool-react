import React from 'react';

import styles from './Skeleton.module.scss';

type SkeletonProps = React.ComponentProps<'div'>;

class Skeleton extends React.Component<SkeletonProps> {
  render() {
    const { className, ...rest } = this.props;

    return <div {...rest} className={`${styles.skeleton} ${className}`}></div>;
  }
}

export default Skeleton;
