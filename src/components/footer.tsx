import * as React from "react";
import { FiGithub } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="Footer">
      <FiGithub size={24} color="#4e5562" />

      <div>
        <a
          className="FooterLink"
          href="https://github.com/charliewilco/mobx-react-todo"
        >
          Source Code
        </a>
      </div>
    </footer>
  );
}
