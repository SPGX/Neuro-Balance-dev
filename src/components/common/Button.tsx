import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'outline';
  color?: 'blue' | 'cyan' | 'teal' | 'gray';
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'w-[100px] h-[36px] text-sm px-4 py-1',
  md: 'w-[135px] h-[46px] text-base px-[20px] py-[5px]',
  lg: 'w-[160px] h-[54px] text-lg px-6 py-3'
};

const colorClasses = {
  blue: {
    primary: 'bg-[#106EE8] text-white hover:bg-[#0e5ec8]',
    outline: 'border border-[#106EE8] text-[#106EE8] hover:bg-[#E6F0FF]'
  },
  cyan: {
    primary: 'bg-[#00AAFF] text-white hover:bg-[#0096E6]',
    outline: 'border border-[#00AAFF] text-[#00AAFF] hover:bg-[#E0F6FF]'
  },
  teal: {
    primary: 'bg-[#2BAB94] text-white hover:bg-[#239781]',
    outline: 'border border-[#2BAB94] text-[#2BAB94] hover:bg-[#E0F7F4]'
  },
  gray: {
    primary: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100'
  }
};

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  color = 'blue',
  disabled = false,
  className = '',
  size = 'md'
}: Props) {
  const base = 'rounded-[100px] font-medium transition duration-200 inline-flex items-center justify-center';
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const variantClass = colorClasses[color]?.[variant] || colorClasses.blue[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        base,
        sizeClass,
        variantClass,
        {
          'opacity-50 cursor-not-allowed': disabled
        },
        className
      )}
    >
      {children}
    </button>
  );
}
