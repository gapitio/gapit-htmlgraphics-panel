import React from 'react';
import Link from '@docusaurus/Link';

export function NewRelease() {
  return (
    <div className="container">
      <h1 style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/docs/release-notes/v2.1.0">HTMLGraphics v2.1.0 is out!</Link>
      </h1>
    </div>
  );
}
