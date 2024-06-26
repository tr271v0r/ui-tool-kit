import React, {FC, memo, useState} from "react";
import {TextFieldProps} from "../types/TextFieldProps";
import cls from './TextField.module.scss'
import {Text} from "ui/components/shared/Text";

import UnmaskText from "styles/assets/icons/unmaskText.svg"
import MaskText from "styles/assets/icons/maskText.svg"
import {classNames} from "lib/classNames/classNames";
import {HStack, VStack} from "ui/components/shared/Stack";
import {Icon} from "ui/components/shared/Icon";

const sumPixels = (valuePx: string, value: number) => {
    return (parseInt(valuePx.replace(/px/, ""))+value)+"px";
}

export const TextField: FC<TextFieldProps> = memo(props => {
    
    const {
        value,     
        onChange,
        
        label,
        limit,

        disabled=false,
        masked = false,

        inputWidth = '200px',

        className = '',
        ...otherProps
    } = props;

    const [type, setType] = useState<string>(masked ? 'password' : 'text');
    const switchMask = () =>{
        setType( type === 'text' ? 'password' : 'text');
    }

    const EyeButtonProps = {
        clickable: true, 
        onClick: switchMask, 
        width: 24, 
        height:24, 
    };

    return(
        <HStack 
            justify="between"
            align="center"
            className={classNames(cls.background, {[cls.disabled]: disabled}, [className])}
        >
            <VStack className={cls.field}>
                <input 
                    className={cls.input}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    type={type} 
                    maxLength={limit}
                    id={label}
                    placeholder=''
                    autoComplete="off"
                    spellCheck={false}
                    disabled={disabled}
                    style={{width: masked?
                            inputWidth :
                            sumPixels(inputWidth, 24)
                    }}
                    {...otherProps}
                />
                <label 
                    className={cls.label}
                    htmlFor={label}
                >
                    <Text size="s">
                        {label}
                    </Text>
                </label>
            </VStack>
            {masked && (
                type === 'text' ?
                    <Icon Svg={MaskText} className={cls.eyeButton} {...EyeButtonProps}/> :
                    <Icon Svg={UnmaskText} className={cls.eyeButton}  {...EyeButtonProps}/>        
            )}
        </HStack>
    )
});