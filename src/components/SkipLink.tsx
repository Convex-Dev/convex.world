import styles from "./SkipLink.module.css";

/** The id every page gives its <main> element, so the skip link can jump to it. */
export const MAIN_CONTENT_ID = "main-content";

/** First focusable element on every page: lets keyboard users jump past the navigation. */
export default function SkipLink() {
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className={styles.skipLink}>
      Skip to content
    </a>
  );
}
