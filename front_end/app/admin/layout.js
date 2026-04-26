export default function AdminLayout({ children }) {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#111", color: "#fff" }}>
        Admin Navbar
      </nav>

      <main>{children}</main>
    </div>
  );
}