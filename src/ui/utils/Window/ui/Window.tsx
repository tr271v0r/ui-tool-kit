import React, { FC } from 'react';
import { Mods, classNames } from "lib/classNames/classNames";
import { memo } from "react";
import  cls  from './Window.module.scss';
import { Portal } from 'ui/utils/Portal/Portal';

import { Overlay } from 'ui/utils/Overlay/Overlay';
import { AlignContent, JustifyContent, WindowProps } from '../types/WindowProps';
import { useModal } from 'lib/hooks/useModal/useModal';
import { ANIMATION_DELAY } from 'styles/effects/anims';

const mapJustifyContentToClass: Record<JustifyContent, string> = {
    center: 'justify_center',
    start: 'justify_start',
    end: 'justify_end',
    between: 'justify_between'
} 
const mapAlignContentToClass: Record<AlignContent, string> = {
    center: 'align_center',
    start: 'align_start',
    end: 'align_end',
    stretch: 'align_stretch'
} 

export const Window: FC<WindowProps> = memo((props) => {
    const {
        className,
        content,
        isOpen=true,
        onClose,
        closable = true,
        lazy = true,
        fullscreen = false,
        alignContent = 'center',
        justifyContent = 'center',
        sidebar,
        portalElement,
        minContentWidth,
        maxContentWidth,
        minContentHeight,
        maxContentHeight,
        blur = false
    } = props;
  
    const {
        isClosing,
        isMounted,
        close,
    } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
        closable
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    const justifyContentClass = mapJustifyContentToClass[justifyContent];
    const alignContentClass = mapAlignContentToClass[alignContent];

    return (
        <Portal element={portalElement}>
            <div className={classNames(cls.Window, mods, [className, ])}>
                <Overlay type={'window'} onClick={closable ? close : () => {}} />
                <div className={classNames(cls.layout, {[cls.fullscreen]: fullscreen, [cls.blur]: blur}, [])}>
                    {sidebar}
                    <div
                        style={{
                            minWidth: minContentWidth, 
                            maxWidth: maxContentWidth,
                            minHeight: minContentHeight, 
                            maxHeight: maxContentHeight
                        }} 
                        className={classNames(cls.content, {}, [cls[justifyContentClass], cls[alignContentClass]])}
                    >
                        {content}
                    </div>
                </div>
            </div>
        </Portal>
    );
});