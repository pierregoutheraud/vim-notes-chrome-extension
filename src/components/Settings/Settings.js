import React from "react";
import { useStore, useAction } from "easy-peasy";
import cx from "classnames";

import styles from "./Settings.css";
import { FONTS } from "../../constants/constants";
import Toggle from "../Toggle/Toggle";
import Radio from "../Radio/Radio";

export default function Settings({ className }) {
  const font = useStore(state => state.settings.font);
  const fontSize = useStore(state => state.settings.fontSize);
  const nightmode = useStore(state => state.settings.nightmode);
  const setFont = useAction(dispatch => dispatch.settings.setFont);
  const smallerFontSize = useAction(
    dispatch => dispatch.settings.smallerFontSize
  );
  const biggerFontSize = useAction(
    dispatch => dispatch.settings.biggerFontSize
  );
  const edit = useAction(dispatch => dispatch.settings.edit);

  const fonts = FONTS.map(f => {
    return (
      <Radio
        key={f}
        className={styles.radio}
        id={`id_${f}`}
        value={f}
        checked={f === font}
        onChange={() => {
          setFont(f);
        }}
        label={f}
      />
    );
  });

  return (
    <aside
      className={cx(styles.container, className, {
        [styles.nightmode]: nightmode,
      })}
    >
      <fieldset className={cx(styles.fieldset, styles.font)}>
        <h3>Font Family</h3>
        <div className={styles.choices}>{fonts}</div>
      </fieldset>
      <fieldset className={cx(styles.fieldset, styles.fontSize)}>
        <h3>Font Size</h3>
        <div className={styles.choices}>
          <button onClick={smallerFontSize}>
            <i className="material-icons">remove</i>
          </button>
          <span>{fontSize}</span>
          <button onClick={biggerFontSize}>
            <i className="material-icons">add</i>
          </button>
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <h3>Night mode</h3>
        <div className={styles.choices}>
          <Toggle
            defaultValue={nightmode}
            onChange={value => edit({ field: "nightmode", value })}
          />
        </div>
      </fieldset>
    </aside>
  );
}
