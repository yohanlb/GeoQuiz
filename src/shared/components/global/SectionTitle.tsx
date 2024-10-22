type Props = {
  text: string;
  variant?: 'h2' | 'h3' | 'description';
  centered?: boolean;
};

const SectionTitle = ({ text, variant = 'h2', centered = false }: Props) => {
  const textClasses = centered ? 'text-center' : '';

  switch (variant) {
    case 'h2':
      return (
        <h2
          className={`text-lg font-medium tracking-wide md:text-2xl ${textClasses} }`}
        >
          {text}
        </h2>
      );
      break;
    case 'h3':
      return (
        <h3
          className={`font-base text-base tracking-wide md:text-xl ${textClasses}`}
        >
          {text}
        </h3>
      );
      break;
    case 'description':
      return (
        <p className={`text-sm text-gray-400 md:text-base ${textClasses}`}>
          {text}
        </p>
      );
      break;
  }
};

export default SectionTitle;
