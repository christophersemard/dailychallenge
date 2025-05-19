// src/supabase/supabase.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
    private client: SupabaseClient;

    constructor(private config: ConfigService) {
        const url = config.get<string>("SUPABASE_URL");
        const key = config.get<string>("SUPABASE_SERVICE_ROLE_KEY");

        console.log("Supabase URL:", url);
        console.log("Supabase Key:", key);

        if (!url || !key) throw new Error("Supabase env variables missing");

        this.client = createClient(url, key);
    }

    getClient() {
        return this.client;
    }
}
