import React, {FC, MutableRefObject, useCallback, useEffect, useRef } from "react";
import { AlertItemProps, AlertItemType, AlertType } from "../types/AlertItemProps";
import { classNames } from "lib/classNames/classNames";

import cls from './AlertItem.module.scss';
import { Portal } from "ui/utils/Portal/Portal";
import { Text, textFont, textSize } from "ui/components/shared/Text";

import IconWarning from 'styles/assets/icons/warning.svg'
import IconError from 'styles/assets/icons/error.svg'
import IconSuccess from 'styles/assets/icons/success.svg'
import IconInfo from 'styles/assets/icons/info.svg'
import { useModal } from "lib/hooks/useModal/useModal";
import { ANIMATION_DELAY } from "styles/effects/anims";
import { HStack, VStack } from "ui/components/shared/Stack";
import { Icon } from "ui/components/shared/Icon/Icon";


const getIconAlert = (type?: AlertType): ReturnType<typeof Icon> => {
  
  let result: ReturnType<typeof Icon>;

  switch(type){
    case 'warning':{result = <Icon Svg={IconWarning}/>}
    case 'error':{result = <Icon Svg={IconError}/>}
    case 'success':{result = <Icon Svg={IconSuccess}/>}
    case 'info':{result = <Icon Svg={IconInfo}/>}
    default: {result = <Icon Svg={IconWarning}/>}
  }

  return result;
}

const AlertItem: FC<AlertItemProps> = (props) => {

  const {
    item,
    className,
    lazy,
    onClose
  } = props;

  const isOpen = true;

  const {
      isClosing,
      isMounted,
      close,
  } = useModal({
      animationDelay: ANIMATION_DELAY,
      onClose,
      isOpen,
  });

  // const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  
  const mods: Record<string, boolean> = {
    [cls.isOpen]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Alert, mods, [])} onClick={close}>
        <VStack className={cls.wrapper} gap='16'>
          <HStack max justify="center" gap="8">
            {getIconAlert(item.type)}
            <Text font={textFont.TITLE} size={textSize.REGULAR}>{item.title ?? 'Alert'}</Text>
            {getIconAlert(item.type)}
          </HStack>
          <div className={classNames(cls.description, {}, [])}>
              {item.body}
          </div>
        </VStack>
      </div>
    </Portal>
  )
};

export default AlertItem;