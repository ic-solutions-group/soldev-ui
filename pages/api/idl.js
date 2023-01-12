import { AnchorProvider, Program } from '@project-serum/anchor';
import {Connection, PublicKey} from '@solana/web3.js';

export default async function handler(
    req,
    res
) {
    if (req.method === 'GET') {
        try {
            const address = req.query.address;

            const connection = new Connection(
                process.env.NEXT_PUBLIC_NODE_URL
        );

            const provider = new AnchorProvider(
                connection,
                {
                    publicKey: PublicKey.default,
                    signAllTransactions: undefined,
                    signTransaction: undefined,
                },
                { commitment: 'processed', skipPreflight: true }
            );

            const idl = await Program.fetchIdl(address, provider);

            res.status(200).json({
                name: idl.name,
                address: address,
                id: 1,
                idl,
            });
        } catch (e) {
            console.error('Error:', e);
            res.status(500).json({ error: e.message });
        }
    }
}