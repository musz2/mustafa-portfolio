import { useState, type FormEvent } from "react";
import Arrow from "../components/Arrow";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BtnLink } from "../components/Btn";
import { site } from "../data/site";

interface Fields {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const empty: Fields = { name: "", email: "", company: "", service: "", message: "" };

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export default function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (event: { target: { value: string } }) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSent(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = "Please add your name.";
    if (!isEmail(fields.email)) next.email = "Please add a valid email address.";
    if (!fields.message.trim()) next.message = "Please add a short message.";

    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      document.getElementById(`form-${firstInvalid}`)?.focus();
      return;
    }

    const body = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      fields.company && `Organisation: ${fields.company}`,
      fields.service && `Looking for: ${fields.service}`,
      "",
      fields.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project enquiry — ${fields.name}`
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  const rows: {
    index: string;
    key: keyof Fields;
    label: string;
    placeholder: string;
    type?: string;
    textarea?: boolean;
  }[] = [
    { index: "01", key: "name", label: "What's your name?", placeholder: "Your name *" },
    {
      index: "02",
      key: "email",
      label: "What's your email?",
      placeholder: "you@company.com *",
      type: "email",
    },
    {
      index: "03",
      key: "company",
      label: "Which organisation are you with?",
      placeholder: "Company ®",
    },
    {
      index: "04",
      key: "service",
      label: "What are you looking for?",
      placeholder: "Cloud infra, CI/CD, product build ...",
    },
    {
      index: "05",
      key: "message",
      label: "Your message",
      placeholder: "Hello Mustafa, can you help with ... *",
      textarea: true,
    },
  ];

  return (
    <>
      <header className="section default-header contact-header theme-dark">
        <NavBar />
        <div className="container medium">
          <div className="row once-in">
            <div className="flex-col">
              <h1>
                <span>
                  <span className="profile-picture" aria-hidden="true" /> Let&rsquo;s get
                </span>{" "}
                <span>something running</span>
              </h1>
            </div>
            <div className="flex-col">
              <span className="profile-picture" aria-hidden="true" />
              <Arrow />
            </div>
          </div>

          <div className="row once-in">
            <div className="flex-col">
              <form className="form" onSubmit={onSubmit} noValidate>
                {rows.map((row) => (
                  <div
                    className={`form-col${fields[row.key] ? " not-empty" : ""}`}
                    key={row.key}
                  >
                    <h5>{row.index}</h5>
                    <label className="label" htmlFor={`form-${row.key}`}>
                      {row.label}
                    </label>
                    {row.textarea ? (
                      <textarea
                        className="field"
                        id={`form-${row.key}`}
                        name={row.key}
                        rows={8}
                        placeholder={row.placeholder}
                        value={fields[row.key]}
                        onChange={set(row.key)}
                        required={["name", "email", "message"].includes(row.key)}
                        aria-describedby={errors[row.key] ? `error-${row.key}` : undefined}
                        aria-invalid={Boolean(errors[row.key])}
                      />
                    ) : (
                      <input
                        className="field"
                        id={`form-${row.key}`}
                        name={row.key}
                        type={row.type ?? "text"}
                        autoComplete={row.key === "company" ? "organization" : row.key === "service" ? undefined : row.key}
                        placeholder={row.placeholder}
                        value={fields[row.key]}
                        onChange={set(row.key)}
                        required={["name", "email", "message"].includes(row.key)}
                        aria-describedby={errors[row.key] ? `error-${row.key}` : undefined}
                        aria-invalid={Boolean(errors[row.key])}
                      />
                    )}
                    {errors[row.key] && (
                      <div className="alert" id={`error-${row.key}`} role="alert">
                        <p>{errors[row.key]}</p>
                      </div>
                    )}
                  </div>
                ))}

                {sent && (
                  <div className="alert alert-success" role="status">
                    <p>Thanks — your mail app should be open with the message ready to send.</p>
                  </div>
                )}

                <div className="btn-contact-send">
                  <div className="btn btn-round">
                    <button
                      type="submit"
                      className="btn-click magnetic"
                      data-strength="100"
                      data-strength-text="50"
                    >
                      <span className="btn-fill" />
                      <span className="btn-text">
                        <span className="btn-text-inner">Send it</span>
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex-col">
              <h5>Contact details</h5>
              <ul className="links-wrap">
                <BtnLink href={`mailto:${site.email}`} external>
                  {site.email}
                </BtnLink>
                <BtnLink href={site.phoneHref} external>
                  {site.phone}
                </BtnLink>
              </ul>

              <h5>Details</h5>
              <ul className="links-wrap">
                <li>
                  <p>{site.name}</p>
                </li>
                <li>
                  <p>DevOps &amp; Cloud Engineer</p>
                </li>
                <li>
                  <p>Location: {site.location}</p>
                </li>
                <li>
                  <p>Open to full-time and contract work</p>
                </li>
              </ul>

              <h5>Socials</h5>
              <ul className="links-wrap">
                <BtnLink href={site.github} external>
                  GitHub
                </BtnLink>
                <BtnLink href={site.linkedin} external>
                  LinkedIn
                </BtnLink>
                <BtnLink href={site.resume} external>
                  Résumé
                </BtnLink>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <Footer contactPage />
    </>
  );
}
