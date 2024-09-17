import styles from './PositionsList.module.scss'

export const PositionsList = ({ positions }) => {
  return (
    <fieldset className={styles.radioFieldset}>
      <legend className={styles.radioLegend}>Select your position</legend>
      <div className={styles.radioList}>
        {positions.map(({ id, name }) => (
          <div key={id}>
            <label htmlFor={name}>
              <RadioButton
                isSelected={values.position_id === id}
                key={id}
              >
                {name}
              </RadioButton>
              <Field
                type="radio"
                name="position_id"
                value={id}
                id={name}
                className="visuallyHidden"
                onChange={(e) => setFieldValue('position_id', +e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
