import styles from './SearchBar.module.scss';

export const SearchBar = ({ 
  value, 
  onChange 
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};