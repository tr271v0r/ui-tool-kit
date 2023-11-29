import React, {FC} from 'react';

import './MyButton.css'

export interface MyButtonProps {
    color: string;
    big?: boolean;
    children: string;
}

const MyButton: FC<MyButtonProps> = ({
                                        children,
                                        color,
                                        big,
                                        ...props
                                    }) => {
  
    const rootClasses = ['btn']
    if(big){
        rootClasses.push('big-btn')
    }       

    return (
        <button 
            {...props}    
            className={rootClasses.join(' ')} 
            style={{color}}
        >
            {children}
        </button >
    )
};

export default MyButton;