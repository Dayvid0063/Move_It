export interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'outline';
    isLoading?: boolean;
  }
  
  export interface InputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  }
  