package com.example.back.service;

import com.example.back.dto.JandiDto;
import com.example.back.dto.UserDto;
import com.example.back.entity.Diary;
import com.example.back.entity.Liked;
import com.example.back.entity.User;
import com.example.back.repository.LikedRepository;
import com.example.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final LikedService likedService;

    @Override
    public boolean signup(UserDto user) {
        String password = user.getPassword();
        String encPass = BCrypt.hashpw(password, BCrypt.gensalt());
        System.out.println("확인해보자" + user.getPassword());

        if (!validateDuplicateUser(user)) {
            return false;
        }
        else {
            User info = User.builder()
                    .userId(user.getUserId())
                    .password(encPass)
                    .nickname(user.getNickname())
                    .image(user.getImage())
                    .gender(user.getGender())
                    .age(user.getAge())
                    .build();
            userRepository.save(info);

            return true;
        }

    }

    @Override
    public Boolean validationCheck(String userId) {
        return userRepository.existsById(userId);
    }

    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findByUserId(userId);

        userRepository.delete(user);
    }

    @Override
    public User modifyUser(String userId, UserDto userDto) {
        User user = userRepository.findByUserId(userId);

        if (user == null) {
            return null;
        }

        user.setAge(userDto.getAge());
        user.setImage(userDto.getImage());

        userRepository.save(user);

        return user;
    }

    @Override
    public List<String> readJandi(String userId, int year, int month) {
        User user = userRepository.findByUserId(userId);

        if (user == null) {
            return null;
        }
        List<String> jandis = new ArrayList<>();

        for (Diary diary : user.getDairies()) {
            if (year == diary.getCreatedat().getYear() && month == diary.getCreatedat().getMonthValue()) {
                jandis.add(diary.getCreatedat().getYear() + "-" + diary.getCreatedat().getMonthValue() + "-" + diary.getCreatedat().getDayOfMonth());
            }
        }

        if (jandis.isEmpty()) {
            System.out.println("여기로 들어온다");
            return null;
        }

        return jandis;
    }

    @Override
    public User readUser(String userId) {
        User user = userRepository.findByUserId(userId);

        if (user == null) {
            return null;
        }

        for (Diary diary : user.getDairies()) {
            diary.setLiked(likedService.readLiked(diary.getDno()));
        }

        return user;
    }

    public boolean validateDuplicateUser(UserDto user) {
        User findUsers = userRepository.findByUserId(user.getUserId());
        if (findUsers != null) {
            return false;
        }
        return true;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(username);

        if (user == null) throw new UsernameNotFoundException("User: " + username + " not found");

        return new org.springframework.security.core.userdetails.User(user.getUserId(), user.getPassword(),
                Arrays.asList(new SimpleGrantedAuthority("user")));
    }
}
