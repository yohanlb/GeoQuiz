type Props = {
  text: string;
  variant?: 'h2' | 'h3' | 'description';
};

const SectionTitle = ({ text, variant = 'h2' }: Props) => {
  switch (variant) {
    case 'h2':
      return (
        <h2 className='text-center text-lg font-medium tracking-wide md:text-2xl'>
          {text}
        </h2>
      );
      break;
    case 'h3':
      return (
        <h3 className='font-base text-base tracking-wide md:text-xl'>{text}</h3>
      );
      break;
    case 'description':
      return <p className='text-gray-400'>{text}</p>;
      break;
  }
};

export default SectionTitle;
