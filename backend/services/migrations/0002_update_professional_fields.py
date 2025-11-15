from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='professional',
            old_name='calendly_username',
            new_name='calendly_url',
        ),
        migrations.AlterField(
            model_name='professional',
            name='calendly_url',
            field=models.URLField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='professional',
            name='tipo_servicio',
            field=models.CharField(
                choices=[
                    ('psicologia', 'Psicología'),
                    ('metodologia', 'Metodología'),
                    ('integral', 'Plan Integral'),
                ],
                max_length=20,
            ),
        ),
    ]
