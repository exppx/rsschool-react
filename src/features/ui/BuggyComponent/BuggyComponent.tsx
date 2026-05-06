import React from 'react';

class BuggyComponent extends React.Component<{ shouldThrow: boolean }> {
  render() {
    if (this.props.shouldThrow)
      throw new Error('I said you not to touch it 🙄');

    return <div></div>;
  }
}

export default BuggyComponent;
