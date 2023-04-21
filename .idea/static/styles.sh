# sass profile.scss profile.css
for scss in *.scss; do
    sass $scss ${scss%.scss}.css
done