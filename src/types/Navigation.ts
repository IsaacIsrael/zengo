import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CryptoDetails: { coinId: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type Screen<T extends keyof RootStackParamList> = React.FC<RootStackScreenProps<T>>;
