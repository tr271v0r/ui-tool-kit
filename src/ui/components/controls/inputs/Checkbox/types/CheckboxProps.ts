//export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
export interface CheckboxProps{
    id: string;
    checked?: boolean;
    onChange: () => void;
    children?: React.ReactNode;
    disabled?: boolean;

    className?: string;
}