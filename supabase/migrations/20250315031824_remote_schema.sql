create type "public"."service_category" as enum ('Consulting', 'Development', 'Education');

drop policy "Allow public read access for service_categories" on "public"."service_categories";

drop policy "Allow public read access for service_details" on "public"."service_details";

revoke delete on table "public"."service_categories" from "anon";

revoke insert on table "public"."service_categories" from "anon";

revoke references on table "public"."service_categories" from "anon";

revoke select on table "public"."service_categories" from "anon";

revoke trigger on table "public"."service_categories" from "anon";

revoke truncate on table "public"."service_categories" from "anon";

revoke update on table "public"."service_categories" from "anon";

revoke delete on table "public"."service_categories" from "authenticated";

revoke insert on table "public"."service_categories" from "authenticated";

revoke references on table "public"."service_categories" from "authenticated";

revoke select on table "public"."service_categories" from "authenticated";

revoke trigger on table "public"."service_categories" from "authenticated";

revoke truncate on table "public"."service_categories" from "authenticated";

revoke update on table "public"."service_categories" from "authenticated";

revoke delete on table "public"."service_categories" from "service_role";

revoke insert on table "public"."service_categories" from "service_role";

revoke references on table "public"."service_categories" from "service_role";

revoke select on table "public"."service_categories" from "service_role";

revoke trigger on table "public"."service_categories" from "service_role";

revoke truncate on table "public"."service_categories" from "service_role";

revoke update on table "public"."service_categories" from "service_role";

revoke delete on table "public"."service_details" from "anon";

revoke insert on table "public"."service_details" from "anon";

revoke references on table "public"."service_details" from "anon";

revoke select on table "public"."service_details" from "anon";

revoke trigger on table "public"."service_details" from "anon";

revoke truncate on table "public"."service_details" from "anon";

revoke update on table "public"."service_details" from "anon";

revoke delete on table "public"."service_details" from "authenticated";

revoke insert on table "public"."service_details" from "authenticated";

revoke references on table "public"."service_details" from "authenticated";

revoke select on table "public"."service_details" from "authenticated";

revoke trigger on table "public"."service_details" from "authenticated";

revoke truncate on table "public"."service_details" from "authenticated";

revoke update on table "public"."service_details" from "authenticated";

revoke delete on table "public"."service_details" from "service_role";

revoke insert on table "public"."service_details" from "service_role";

revoke references on table "public"."service_details" from "service_role";

revoke select on table "public"."service_details" from "service_role";

revoke trigger on table "public"."service_details" from "service_role";

revoke truncate on table "public"."service_details" from "service_role";

revoke update on table "public"."service_details" from "service_role";

alter table "public"."service_categories" drop constraint "service_categories_category_slug_key";

alter table "public"."service_details" drop constraint "service_details_service_id_fkey";

alter table "public"."service_details" drop constraint "service_details_service_id_key";

alter table "public"."services" drop constraint "services_category_id_fkey";

alter table "public"."service_categories" drop constraint "service_categories_pkey";

alter table "public"."service_details" drop constraint "service_details_pkey";

drop index if exists "public"."idx_services_category_id";

drop index if exists "public"."service_categories_category_slug_key";

drop index if exists "public"."service_categories_pkey";

drop index if exists "public"."service_details_pkey";

drop index if exists "public"."service_details_service_id_key";

drop table "public"."service_categories";

drop table "public"."service_details";

alter table "public"."services" drop column "category_id";

alter table "public"."services" add column "category" service_category not null;


