﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Repository;

#nullable disable

namespace Api.Migrations
{
    [DbContext(typeof(RepositoryContext))]
    [Migration("20241117154317_DeletedRoles")]
    partial class DeletedRoles
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Models.Character", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Attibutes")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Backgrounds")
                        .HasColumnType("text");

                    b.Property<int?>("Bloodpool")
                        .HasColumnType("integer");

                    b.Property<string>("Disciplines")
                        .HasColumnType("text");

                    b.Property<int?>("Experience")
                        .HasColumnType("integer");

                    b.Property<byte[]>("Health")
                        .HasColumnType("bytea");

                    b.Property<string>("OtherTraits")
                        .HasColumnType("text");

                    b.Property<string>("PathName")
                        .HasColumnType("text");

                    b.Property<byte?>("PathValue")
                        .HasColumnType("smallint");

                    b.Property<string>("Skills")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserID")
                        .HasColumnType("uuid");

                    b.Property<string>("Virtues")
                        .HasColumnType("text");

                    b.Property<int?>("WillPower")
                        .HasColumnType("integer");

                    b.Property<int?>("WillPowerLimit")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("Characters");
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("UserID");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Models.Character", b =>
                {
                    b.HasOne("Models.User", null)
                        .WithMany("Characters")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Navigation("Characters");
                });
#pragma warning restore 612, 618
        }
    }
}
