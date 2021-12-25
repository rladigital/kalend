import { CalendarViewDropdownProps } from './CalendarViewDropdown.props';
import { Config } from '../../common/interface';
import { Context } from '../../context/store';
import { EvaIcons } from '../eva-icons';
import { parseCalendarViewToText, parseCssDark } from '../../utils/common';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonBase from '../buttonBase/ButtonBase';
import ButtonIcon from '../buttonIcon/ButtonIcon';
import HeaderCalendarButtons, {
  isSingleView,
} from '../headerCalendarButtons/HeaderCalendarButtons';

const CalendarViewDropdown = (props: CalendarViewDropdownProps) => {
  const { t } = useTranslation();

  const { setViewChanged } = props;

  const [isOpen, setOpen] = useState(false);

  const [store] = useContext(Context);
  const { config, isMobile, selectedView } = store;
  const { isDark, disabledViews, disableMobileDropdown } = config as Config;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const preventDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (isMobile && (disableMobileDropdown || isSingleView(disabledViews))) ||
    isSingleView(disabledViews) ? null : (
    <>
      <div className={'Kalend__CalendarViewDropdown__wrapper'}>
        {isMobile ? (
          <ButtonIcon isDark={isDark} key={'calendar'} onClick={handleOpen}>
            <EvaIcons.More className={parseCssDark('icon-svg', isDark)} />
          </ButtonIcon>
        ) : (
          <ButtonBase
            isDark={isDark}
            className={'Kalend__ButtonBase-border'}
            onClick={handleOpen}
            text={t(parseCalendarViewToText(selectedView))}
          />
        )}
        {isOpen ? (
          <div
            className={'Kalend__CalendarViewDropdown__backdrop'}
            onClick={handleClose}
          />
        ) : null}
        {isOpen ? (
          <div className={'Kalend__CalendarViewDropdown__container'}>
            <div
              className={'Kalend__CalendarViewDropdown__container-content'}
              onClick={preventDefault}
            >
              <HeaderCalendarButtons
                disabledViews={disabledViews}
                setViewChanged={setViewChanged}
                handleClose={handleClose}
                isForcedMobile={true}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CalendarViewDropdown;
