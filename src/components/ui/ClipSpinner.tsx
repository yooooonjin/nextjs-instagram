import dynamic from 'next/dynamic';

//css 충돌로 인한 에러 콘솔 => import 지연
const ClipLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.ClipLoader),
  { ssr: false }
);

type Props = {
  color?: string;
};

export default function ClipSpinner({ color = 'black' }: Props) {
  return <ClipLoader color='black' className='mt-20' />;
}
