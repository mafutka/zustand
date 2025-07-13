import styles from './Heading.module.css';

export type HeadingProps = {
  title: string;
  top: string;
  bottom: string;
  error: string;
  info: string;
};

export default function Heading({ title, top, bottom, error, info }: HeadingProps) {
  let className = styles.title;

  if (top) className += ` ${styles.top}`;
  if (bottom) className += ` ${styles.bottom}`;
  if (error) className += ` ${styles.error}`;
  if (info) className += ` ${styles.info}`;

  return <h2 className={className}>{title}</h2>;
}
