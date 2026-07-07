import dynamic from 'next/dynamic'
import { LucideProps, ArrowRight } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface IconProps extends LucideProps {
  name: string;
}

const iconCache: Record<string, React.ComponentType<any>> = {};

const DynamicIcon = ({ name, ...props }: IconProps) => {
  const iconName = name.startsWith('lucide-') ? name.replace('lucide-', '') : name;
  const normalizedName = iconName.toLowerCase().replace(/_/g, '-') as keyof typeof dynamicIconImports;
  
  if (!iconCache[normalizedName]) {
    if (dynamicIconImports[normalizedName]) {
      iconCache[normalizedName] = dynamic(dynamicIconImports[normalizedName]) as React.ComponentType<any>;
    } else {
      iconCache[normalizedName] = ArrowRight;
    }
  }

  const LucideIcon = iconCache[normalizedName];
  return <LucideIcon {...props} />;
};

export default DynamicIcon;
