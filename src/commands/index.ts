import Context from "telegraf/typings/context";
import { Update } from "telegraf/typings/core/types/typegram";
import { Telegraf } from "telegraf/typings/telegraf";
import { isAdmin } from "../middlewares/admin";
import { banUser } from "./ban";
import {
    addCustomCommand,
    deleteCustomCommand,
    getCustomCommands,
} from "./custom_commands";
import { kickUser } from "./kick";
import { translateText } from "./translate";
import { warnUser } from "./warn";

export const setupCommands = (bot: Telegraf<Context<Update>>) => {
    bot.command("ping", isAdmin, (ctx) => ctx.reply("Pong!"));

    bot.hears(/^\/warn\s?(.*)$/, isAdmin, (ctx) =>
        warnUser(ctx, ctx?.message?.reply_to_message?.from)
    );

    bot.hears(/^\/ban\s?(.*)$/, isAdmin, (ctx) =>
        banUser(ctx, ctx?.message?.reply_to_message?.from)
    );

    bot.hears(/^\/kick\s?(.*)$/, isAdmin, (ctx) =>
        kickUser(ctx, ctx?.message?.reply_to_message?.from)
    );

    bot.hears(
        /\/addcom (\w+) (.*)/,
        isAdmin,
        async (ctx) => await addCustomCommand(ctx)
    );

    bot.hears(
        /\/delcom (\w+)/,
        isAdmin,
        async (ctx) => await deleteCustomCommand(ctx)
    );

    bot.command("commands", async (ctx) => await getCustomCommands(ctx));

    bot.hears(/\/translate\s?(\w+)?/, async (ctx) => await translateText(ctx));
};
