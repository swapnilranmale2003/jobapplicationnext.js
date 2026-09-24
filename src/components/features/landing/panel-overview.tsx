import { Icon, LinkButton } from "@/components/ui";
import { PANEL_OVERVIEW, ROLE_PANELS } from "@/constants";
import { cn } from "@/utils";
import { Section } from "./section";
import styles from "./panel-overview.module.css";

export function PanelOverview() {
  return (
    <Section
      id="panels"
      eyebrow="Role-based dashboards"
      title="One platform, three panels"
      description="Dedicated workspaces for job seekers, recruiters and administrators."
      muted
    >
      <div className={styles.grid}>
        {PANEL_OVERVIEW.map((panel, index) => (
          <article key={panel.role} className={cn(styles.card, styles[panel.role])}>
            <header className={styles.header}>
              <span className={styles.icon}>
                <Icon name={panel.icon} size={20} />
              </span>
              <h3 className={styles.title}>
                {index + 1}. {panel.title}
              </h3>
            </header>
            <ul className={styles.list}>
              {panel.items.map((item) => (
                <li key={item}>
                  <Icon name="checkCircle" size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <LinkButton
              href={ROLE_PANELS[panel.role].nav[0].href}
              variant="secondary"
              icon="arrowRight"
              iconPosition="end"
              fullWidth
            >
              View {panel.title.replace(" (HR)", "")} panel
            </LinkButton>
          </article>
        ))}
      </div>
    </Section>
  );
}
