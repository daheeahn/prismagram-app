import styles from '../../utils/styles';

export const userDetailOption = ({route}) => ({
  headerTitle: route.params.username,
  headerBackTitle: ' ',
  headerTintColor: styles.black,
});
