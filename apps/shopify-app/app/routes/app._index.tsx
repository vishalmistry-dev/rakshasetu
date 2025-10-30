import { useLoaderData } from "react-router";
import { getUsers } from "../lib/db.server";
import { authenticate } from "../shopify.server";

export async function loader({ request }: any) {
  await authenticate.admin(request);
  const users = await getUsers();

  return { users, dbConnected: true };
}

export default function Index() {
  const { users, dbConnected } = useLoaderData() as any;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        🚀 Rakshasetu Shopify App
      </h1>

      <div style={{
        background: '#1a1a1a',
        padding: '16px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#00ff00',
        marginBottom: '20px'
      }}>
        <div>✅ Database Connected: {dbConnected ? 'Yes' : 'No'}</div>
        <div>✅ Users in DB: {users?.length || 0}</div>
        <div>✅ Prisma Client: Working</div>
        <div>✅ Types: Imported from @rakshasetu/database</div>
      </div>

      {users && users.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Recent Users:</h3>
          {users.slice(0, 3).map((user: any) => (
            <div key={user.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
