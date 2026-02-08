module.exports = {
  apps: [
    {
      name: "nova-admin-panel",
      script: "npm",
      args: "run preview", 
      cwd: "/var/www/reactjs_panel_admin_nova",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
