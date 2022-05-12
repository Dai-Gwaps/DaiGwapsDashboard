import Link from "next/link";
import React from "react";
import styles from "./SideNav.module.css";

const SideNav = () => {
  return (
    <nav className={styles.sidebar}>
      <h2 className={styles.logo}>Dai Gwaps</h2>
      <ul className={styles.navitems}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Shipping Groups</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Add New Items</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Intake Items</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Add to Shopify</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
