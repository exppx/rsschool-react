import React from 'react';
import { useLocation } from 'react-router';

export class TestThrowingComponent extends React.Component<{
  shouldThrow: boolean;
  children: React.ReactNode;
}> {
  render() {
    if (this.props.shouldThrow) throw new Error();

    return this.props.children;
  }
}

type TestErrorBoundaryProps = {
  children: React.ReactNode;
  message: string;
};

export class TestErrorBoundary extends React.Component<
  TestErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: TestErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>error happened</div>;
    }

    return this.props.children;
  }
}

export function SearchParamsDisplay() {
  const location = useLocation();
  return <div data-testid="search-params">{location.search}</div>;
}

export function PathDisplay() {
  const location = useLocation();
  return <div data-testid="path">{location.pathname}</div>;
}
