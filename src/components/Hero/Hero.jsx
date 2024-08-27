import { FORM_SECTION_ID } from '../../constants';
import { handleScrollToSection } from '../../helpers';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Test assignment for front-end developer
          </h1>
          <p className={styles.description}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they&apos;ll be building web interfaces with
            accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>
          <Button handleClick={() => handleScrollToSection(FORM_SECTION_ID)}>
            Sign up
          </Button>
        </div>
      </Container>
    </section>
  );
};
