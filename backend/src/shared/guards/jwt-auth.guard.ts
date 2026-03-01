import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new UnauthorizedException('Token não fornecido');

        const token = authHeader.split(' ')[1];
        if (!token) throw new UnauthorizedException('Token em formato inválido');

        // Validate with Supabase
        const supabaseUrl = process.env.SUPABASE_URL || '';
        const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

        if (!supabaseUrl || !supabaseKey) {
            throw new UnauthorizedException('Configuração do Supabase ausente');
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            throw new UnauthorizedException('Token inválido ou expirado');
        }

        // Attach user to request
        request.user = user;
        return true;
    }
}
