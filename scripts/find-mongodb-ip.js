import dns from 'dns';

const hosts = [
  'cluster0.9r3tc5s.mongodb.net',
  'ac-cstbbvm-shard-00-00.9r3tc5s.mongodb.net',
  'ac-cstbbvm-shard-00-01.9r3tc5s.mongodb.net',
  'ac-cstbbvm-shard-00-02.9r3tc5s.mongodb.net'
];

async function resolveHost(host) {
  return new Promise((resolve, reject) => {
    dns.resolve4(host, (err, addresses) => {
      if (err) {
        console.error(`❌ Could not resolve ${host}:`, err.message);
        resolve([]);
      } else {
        console.log(`✅ ${host} resolves to:`, addresses);
        resolve(addresses);
      }
    });
  });
}

async function main() {
  console.log('Resolving MongoDB hostnames...\n');
  
  for (const host of hosts) {
    await resolveHost(host);
  }
  
  console.log('\nTroubleshooting steps:');
  console.log('1. If you see IP addresses above, we can try connecting directly');
  console.log('2. If you see errors, try changing your DNS to 8.8.8.8');
  console.log('3. Try using a different network (e.g., mobile hotspot)');
  console.log('4. Check if your ISP or network is blocking the connection');
}

main().catch(console.error);
