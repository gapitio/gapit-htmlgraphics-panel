import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const featureList = [
  {
    title: 'Offline',
    description: <>All of the functionality of the plugin works without internet connection.</>,
  },
  {
    title: 'Creativity',
    description: <>Create anything. Most things are possible with this plugin.</>,
  },
  {
    title: 'Metric sensitive',
    description: <>This plugin was made to visualize metrics.</>,
  },
];

function Feature({ title, description }: { title: ReactNode; description: ReactNode }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {featureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
