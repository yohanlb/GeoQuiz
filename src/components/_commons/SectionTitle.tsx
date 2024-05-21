type Props = {
  text: string;
  variant?: 'h2' | 'h3';
};

const SectionTitle = ({ text, variant = 'h2' }: Props) => {
  const Tag = variant;
  switch (variant) {
    case 'h2':
      return (
        <Tag className='text-center text-lg font-medium tracking-wide'>
          {text}
        </Tag>
      );
      break;
    case 'h3':
      return <Tag className='font-base text-base tracking-wide'>{text}</Tag>;
      break;
  }
};

export default SectionTitle;
