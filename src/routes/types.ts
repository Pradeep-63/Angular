// types.ts
import { LazyExoticComponent, ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<React.ComponentType<any>>;
  exact?: boolean;
}

export interface TemplateProps {
  children: ReactNode;
}
