function BuggyComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('I said you not to touch it 🙄');

  return <div></div>;
}

export default BuggyComponent;
